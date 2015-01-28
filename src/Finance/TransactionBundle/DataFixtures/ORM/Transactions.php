<?php

namespace Finance\TransactionBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Finance\TransactionBundle\Entity\Transaction;

class Transactions extends AbstractFixture implements OrderedFixtureInterface
{


    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 10;

    }

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {

        for($i = 0; $i < 100; $i++){

            $transaction = new Transaction();

            $transaction->setAmount(mt_rand(0*10, 10000*10)/100);
            $transaction->setTransactionDate(new \DateTime('now + '.$i.' days'));
            $transaction->setUser(mt_rand(1, 3));

            $manager->persist($transaction);
            $manager->flush();
        }

    }
}