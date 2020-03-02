<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{   

    /**
     * Password encoder
     * @var UserPasswordEncoderInterface
     */

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * php bin/console doctrine:fixtures:load
     * @param ObjectManager $manager
     * @return void
     */
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
            for($u = 0; $u < 10; $u++){
                $user = new User;
                $user->setFirstname($faker->firstName())
                     ->setLastname($faker->lastName())
                     ->setEmail($faker->email())
                     ->setPassword($this->encoder->encodePassword($user, 'password'));
                $manager->persist($user);
            }

        $manager->flush();
    }
}
