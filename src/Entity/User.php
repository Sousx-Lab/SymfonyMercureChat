<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *      normalizationContext={"groups"={"users_read"}}
 * )
 * @UniqueEntity("email", message="L'adresse email est déja utilisée !")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"messages_read", "rooms_read", "messages_subresource", "users_read"})
     */
    private $id;

    /**
     * @Assert\NotBlank(message="L'email est obligatoire !")
     * @Assert\Email(message="L'email {{ value }} n'est pas un email valide")
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"messages_read", "rooms_read", "messages_subresource", "users_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @Assert\Length(min=5, minMessage="Le mot de passe est très court (minimum 5 caractères)")
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @Assert\EqualTo(propertyPath="password", message="Veuillez confirmez le même mot de passe")
     * @Assert\NotBlank(message="Veuillez confirmer le mot de passe")
     * @var string The confirmation password registration !
     */
    private $confirmPassword;

    /**
     * @Assert\Length(min=3, minMessage="Le prénom doit faire entre 3 et 255 caractères", 
     * max=255, maxMessage="Le prénom doit faire entre 3 et 255 caractères")
     * @Assert\NotBlank(message="Le prénom de l'utilisateur est obligatoire")
     * @ORM\Column(type="string", length=255)
     * @Groups({"messages_read", "rooms_read", "messages_subresource", "users_read"})
     */
    private $firstname;

    /**
     * @Assert\Length(min=3, minMessage="Le nom de famille doit faire entre 3 et 255 caractères", 
     * max=255, maxMessage="Le nom de famille doit faire entre 3 et 255 caractères")
     * @Assert\NotBlank(message="Le nom de famille du l'utilisateur est obligatoire")
     * @ORM\Column(type="string", length=255)
     * @Groups({"messages_read", "rooms_read", "messages_subresource", "users_read"})
     */
    private $lastname;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get the confirmation password registration !
     *
     * @return string
     */ 
    public function getConfirmPassword()
    {
        return $this->confirmPassword;
    }

    /**
     * Set the confirmation password registration !
     *
     * @param string $cofirmPassword  The confirmation password registration !
     *
     * @return self
     */ 
    public function setConfirmPassword(string $confirmPassword)
    {
        $this->confirmPassword = $confirmPassword;

        return $this;
    }

}
