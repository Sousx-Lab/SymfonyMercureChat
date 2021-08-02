<?php

namespace App\Services\UsersListsFiles;


class HandleUsersList{

    /**
     * usersListFile name
     */
    const FILE_NAME = "usersList.json";

    /**
     * Directory usersListFile
     */
    const FILE_DIR = __DIR__ . DIRECTORY_SEPARATOR . "Data" . DIRECTORY_SEPARATOR;

    /**
     * UsersListFile
     */
    const FILE = self::FILE_DIR . self::FILE_NAME;

    /**
     * Add user to usersListFile
     * @param array $data
     */
    public function addUserToFile(array $data): string
    {
        if(!file_exists(self::FILE)){
            file_put_contents(self::FILE, '');
        };

        $currentList = json_decode(file_get_contents(self::FILE), true);
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
                    file_put_contents(self::FILE, $jsonData);
                    return $jsonData;
                };
            }
            $currentList[] = $data;
            $jsonData = json_encode($currentList);
            file_put_contents(self::FILE, $jsonData);
            return $jsonData;
        }
        file_put_contents(self::FILE, json_encode([$data]));
        $userList = file_get_contents(self::FILE);
        return $userList;
    }

    /**
     * Get current usersListFile
     * @return string|null
     */
    public function getCurrentsList(): string
    {
        $currentList = json_decode(file_get_contents(self::FILE), true);
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
        $currentList = json_decode(file_get_contents(self::FILE), true);

        foreach($currentList as $key => $value)
        {
            if($value['userid'] === $data['userid'])
            {
                unset($currentList["$key"]);
            }
        }
        $jsonData = json_encode(array_values($currentList));
        file_put_contents(self::FILE, $jsonData);
        return $jsonData;
    }
}