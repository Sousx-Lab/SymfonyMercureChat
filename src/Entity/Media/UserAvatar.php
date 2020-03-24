<?php

namespace App\Entity\Media;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\UserAvatarController;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity
 * @Vich\Uploadable
 * @ApiResource(
 *     iri="http://schema.org/MediaObject",
 *     normalizationContext={
 *         "groups"={"users_avatar_read"}
 *     },
 *     itemOperations={
 *         "get", 
 *         "delete"={
 *         "method"="DELETE", 
 *         "path"="/user_avatars/{id}"},
 *     },
 *     collectionOperations={
 *         "post"={
 *             "controller"=UserAvatarController::class,
 *             "deserialize"=false,
 *             "access_control"="is_granted('ROLE_USER')",
 *             "validation_groups"={"Default", "users_avatar_create"},
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "file"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *          }
 *      }
 * )
 */

 class UserAvatar 
 {
     /**
     * @var int|null
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     */
    protected $id;

    /**
     * @var string|null
     * @ApiProperty(iri="http://schema.org/contentUrl")
     * @Groups({"users_avatar_read"})
     */
    private $contentUrl;

    /**
     * @Vich\UploadableField(mapping="user_avatar", fileNameProperty="filePath")
     * @var File|null
     * @Assert\NotNull(groups={"users_avatar_create"})
     */
    private $file;

    /**
     * @var string|null
     * @ORM\Column(nullable=true)
     */
    private $filePath;

    public function getId(): ?int
    {
        return $this->id;
    } 

    /**
     * Get the value of contentUrl
     * @return string|null
     */ 
    public function getContentUrl()
    {
        return $this->contentUrl;
    }

    /**
     * Set the value of contentUrl
     * @param string|null $contentUrl
     *
     * @return self
     */ 
    public function setContentUrl($contentUrl)
    {
        $this->contentUrl = $contentUrl;
        return $this;
    }

    /**
     * Get the value of file
     * @return File|null
     */ 
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * Set the value of file
     * @param File|null $file
     * @return self
     */ 
    public function setFile($file)
    {
        $this->file = $file;
        return $this;
    }
    
    /**
     * Get the value of filePath
     * @return string|null
     */ 
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * Set the value of filePath
     * @param string|null $filePath
     * @return self
     */ 
    public function setFilePath(?string $filePath): ?self
    {
        $this->filePath = $filePath;
        return $this;
    }
 }
