<?php

namespace App\Services\UsersListsFiles;


class HandleUsersListsFiles{

    /**
     * usersListFile name
     * @var string
     */
    private $fileName;

    /**
     * Directory usersListFile
     * @var string
     */
    private $dirFile;
    
    /**
     * UsersListFile
     * @var string
     */
    private $file;

    public function __construct()
    {
        $this->fileName = "usersList.json";
        $this->dirFile = __DIR__ . DIRECTORY_SEPARATOR . "UsersListsFiles" . DIRECTORY_SEPARATOR;
        $this->file = $this->dirFile . $this->fileName;
    }

    /**
     * Add user to usersListFile
     * @param array $data
     */
    public function addUserToFile(array $data): string
    {
        $currentList = json_decode(file_get_contents($this->file), true);
        if(!empty($currentList))
        {
            foreach($currentList as $key => $value)
            {
                if($value['userid'] === $data['userid'] && $value['roomid'] === $data['roomid'] && 
                    $value['username'] === $data['username'])
                {
                    return json_encode($currentList);
                }
                if ($value['userid'] === $data['userid'] && $value['roomid'] !== $data['roomid'])
                {  
                    unset($currentList["$key"]);
                    $currentList[] = $data;
                    $jsonData = json_encode(array_values($currentList));
                    file_put_contents($this->file, $jsonData);
                    return $jsonData;
                };
            }
            $currentList[] = $data;
            $jsonData = json_encode($currentList);
            file_put_contents($this->file, $jsonData);
            return $jsonData;
        }
        file_put_contents($this->file, json_encode([$data]));
        $userList = file_get_contents($this->file);
        return $userList;
    }

    /**
     * Get current usersListFile
     * @return string|null
     */
    public function getCurrentsList(): string
    {
        $currentList = json_decode(file_get_contents($this->file), true);
        if(!empty($currentList))
        {
            return json_encode($currentList);
        }
        $currentList = [];
        return json_encode($currentList);
    }

    /**
     * Delete user to usersList
     * @param array $data
     * @return string
     */
    public function deleteUserToList(array $data): string
    {
        $currentList = json_decode(file_get_contents($this->file), true);

        foreach($currentList as $key => $value)
        {
            if($value['userid'] === $data['userid'])
            {
                unset($currentList["$key"]);
            }
        }
        $jsonData = json_encode(array_values($currentList));
        file_put_contents($this->file, $jsonData);
        return $jsonData;
    }
}