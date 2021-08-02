<?php 

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Services\UsersListsFiles\HandleUsersList;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;

class UsersChannelController extends AbstractController {

    /**
     * @var HandleUsersList
     */
    private $usersList;

    private $topic = 'users_list';

    public function __construct(HandleUsersList $usersList)
    {
        $this->usersList = $usersList;
    }

    /**
     * @return Response
     * @Route("/add_user_list" , name="add_user_list", methods={"POST"})
    */
    public function addUserToList(Request $request, PublisherInterface $publisher): Response
    {
        $userData = json_decode($request->getContent(), true);

        if(!empty($userData['roomid']) || !empty($userData['userid']) || !empty($userData['username']))
        {
            $validatedData = $this->usersList->addUserToFile($userData);
            $publisher(new Update($this->topic, $validatedData));
            $response = JsonResponse::fromJsonString($validatedData);
            return $response;
        }
        
        throw new BadRequestHttpException('Bad Request');
    }

    /**
     * @return Response
     * @Route("/get_users_list" , name="get_users_list", methods={"GET"})
    */
    public function getUsersList(): Response
    {
        $currentList = $this->usersList->getCurrentsList();
        $response = JsonResponse::fromJsonString($currentList);
        return $response;
    }
    
    /**
     * @Route("del_user_list", name="del_user_list")
     * @return void
     */
    public function delUserTolist(Request $request, PublisherInterface $publisher)
    {
        $userData = json_decode($request->getContent(), true);
        if(!empty($userData['userid']) || !empty($userData['username']))
        {
            $validatedData = $this->usersList->deleteUserToList($userData);
            $publisher(new Update($this->topic, $validatedData));
            $response = new Response();
            $response->setStatusCode(Response::HTTP_OK, "user deleted");
        }else{
            throw new BadRequestHttpException('Bad Request');
        }
         return new Response('', Response::HTTP_OK);
    }
}