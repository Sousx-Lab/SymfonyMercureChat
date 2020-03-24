<?php

namespace App\Controller;

use App\Entity\Media\UserAvatar;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

final class UserAvatarController extends AbstractController
{   
    
    /** 
     * @param  Request $request
     * @return UserAvatar
     */

    public function __invoke(Request $request): UserAvatar
    {
        $uploadedFile = $request->files->get("file");
            if(!$uploadedFile){
                throw new BadRequestHttpException('"file" is required');
            }
        $userAvatar = new UserAvatar();
        $userAvatar->setFile($uploadedFile);

        return $userAvatar;
    }

}