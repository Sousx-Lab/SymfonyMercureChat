<?php

namespace App\Events;

use App\Entity\Media\UserAvatar;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {

    /**
     * @param JWTCreatedEvent $event
     */
    public function updateJwtData(JWTCreatedEvent $event)
    {    
        /**
         * @var $user
         */
        $user = $event->getUser();

        if($user->getAvatar() instanceof UserAvatar)
        {
            $avatar = $user->getAvatar()->getFilePath();
            $avatarId = $user ->getAvatar()->getId();
        }else { 
            $avatar = null;
            $avatarId = null;
        }
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $data['avatar'] = $avatar;
        $data['avatarId'] = $avatarId;
        $event->setData($data);

    }
}