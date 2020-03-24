<?php

namespace App\Events;

use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriber
{
    private $encoder;

    protected $requestStack;

    public function __construct(UserPasswordEncoderInterface $encoder, RequestStack $requestStack)
    {
        $this->encoder = $encoder;
        $this->requestStack = $requestStack;
    }

    public function getSubscribedEvents()
    {
        return[
            'prePersist',
            'preUpdate'
        ];
    }
    
    public function prePersist(LifecycleEventArgs $args)
    {   
        $user = $args->getEntity();

        if(!$user instanceof User)
        {
            return;
        }
        $hash = $this->encoder->encodePassword($user, $user->getPassword());
        $user->setUpdatedAt(new \DateTime('now'));
        $user->setPassword($hash);

    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $user = $args->getEntity();
        $oldPassword = $this->getOldPassword();
        $newPassword = $this->getNewPassword();

        if(!$user instanceof User)
        {
            return;
        }

        if($newPassword !== $oldPassword)
        {
            $hash = $this->encoder->encodePassword($user, $newPassword);
            $user->setPassword($hash);
            $user->setUpdatedAt(new \DateTime('now'));
        }
       
    }

    public function getNewPassword(): ?string
    {
        $request = $this->requestStack->getCurrentRequest();
        $data = $request->get('data');
        $newPassword = $data->getPassword();
        return $newPassword;
    }

    public function getOldPassword(): ?string
    {
        $request = $this->requestStack->getCurrentRequest();
        $previousData = $request->get('previous_data');
        $oldPassword = $previousData->getPassword();
        return $oldPassword;
    }
}
