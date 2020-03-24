<?php

namespace App\Events;

use App\Entity\Media\UserAvatar;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Vich\UploaderBundle\Storage\StorageInterface;
use ApiPlatform\Core\EventListener\EventPriorities;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

final class UserAvatarUrlSubscriber implements EventSubscriberInterface 
{
    private $storage;

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public static function getSubscribedEvents(): array
    {
        return[
            KernelEvents::VIEW => ['onPreSerialize', EventPriorities::PRE_SERIALIZE],
        ];
    }

    public function onPreSerialize(ViewEvent $event)
    {
        $controllerResult = $event->getControllerResult();
        $request = $event->getRequest();

        if($controllerResult instanceof Response || !$request->attributes->getBoolean('_api_respond', true))
        {
            return;
        }

        if(!($attributes = RequestAttributesExtractor::extractAttributes($request)) 
            || 
            !\is_a($attributes['resource_class'], UserAvatar::class, true))
        {
            return;
        }

        $userAvatar = $controllerResult;
        
        $userAvatar->setContentUrl($this->storage->resolveUri($userAvatar, 'file'));
    }
}