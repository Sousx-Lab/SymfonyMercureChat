<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *    subresourceOperations={"api_rooms_messages_get_subresource"={
 *      "normalization_context"={"groups"={"messages_subresource"}}
 *     }
 *  },
 *    normalizationContext={"groups"={"messages_read"}},
 *    denormalizationContext={"disable_type_enforcement"=true},
 *    mercure=true
 * )
 * @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"messages_read", "messages_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"messages_read", "rooms_read", "messages_subresource"})
     * @Assert\Length(min=1, minMessage="empty message")
     * @Assert\NotBlank()
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"messages_read", "rooms_read", "messages_subresource"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Room", inversedBy="messages")
     * @Groups({"messages_read"})
     * @ApiSubresource
     */
    private $room;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @Groups({"messages_read", "rooms_read", "messages_subresource"})
     */
    private $sender;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getRoom(): ?Room
    {
        return $this->room;
    }

    public function setRoom(?Room $room): self
    {
        $this->room = $room;

        return $this;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): self
    {
        $this->sender = $sender;

        return $this;
    }
}
