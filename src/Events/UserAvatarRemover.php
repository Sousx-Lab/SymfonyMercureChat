<?php

namespace App\Events;

use Doctrine\ORM\EntityManager;
use Vich\UploaderBundle\Event\Event;


class UserAvatarRemover
{

    private $em;

    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function onPostRemove(Event $event)
    {
        $removedFile = $event->getObject();
        $this->em->remove($removedFile);
        $this->em->flush();
    }
}