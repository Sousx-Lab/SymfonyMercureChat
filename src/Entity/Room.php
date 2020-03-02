<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *   collectionOperations={"GET", "POST"},
 *   itemOperations={"GET", "PUT", "DELETE"},
 *   normalizationContext={"groups"={"rooms_read"}},
 *   mercure=true
 * )
 * @ORM\Entity(repositoryClass="App\Repository\RoomRepository")
 */
class Room
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"rooms_read", "messages_read"})
     */
    private $id;

    /**
     * @Assert\Length(min=3, minMessage="Le nom du channel doit faire minimum 3 caractères",
     * max=20, maxMessage="Le nom de channel doit faire maximum 20 caractères")
     * @Assert\NotBlank(message="Veuillez donner un nom au channel")
     * @ORM\Column(type="string", length=255)
     * @Groups({"rooms_read", "messages_read"})
     */
    private $name;

    /**
     * @Assert\Type(type="\DateTime", message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envois doit être renseignée")
     * @ORM\Column(type="datetime")
     * @Groups({"rooms_read", "messages_read"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Message", mappedBy="room")
     * @Groups({"rooms_read"})
     * @ApiSubresource
     */
    private $messages;


    public function __construct()
    {
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|Message[]
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setRoom($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->contains($message)) {
            $this->messages->removeElement($message);
            // set the owning side to null (unless already changed)
            if ($message->getRoom() === $this) {
                $message->setRoom(null);
            }
        }

        return $this;
    }

}
