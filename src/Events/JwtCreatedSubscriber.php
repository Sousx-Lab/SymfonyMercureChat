<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber {

    /**
     * @param JWTCreatedEvent $event
     */
    public function updateJwtData(JWTCreatedEvent $event){

        /**
         * @var $user
         */
        $user = $event->getUser();

        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstname'] = $user->getFirstname();
        $data['lastname'] = $user->getLastname();
        $event->setData($data);
    }
}