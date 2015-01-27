<?php

namespace Finance\TransactionBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('TransactionBundle:Default:index.html.twig', array('name' => $name));
    }

    public function userTransactionAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $transactions = $em->getRepository('TransactionBundle:Transaction')->findByUser($id);

        return $this->render('@Transaction/portada.html.twig', array(
            'transactions' => $transactions,
            'user' => true
        ));

    }

    public function allTransactionAction()
    {
        $em = $this->getDoctrine()->getManager();

        $transactions = $em->getRepository('TransactionBundle:Transaction')->findAll();

        return $this->render('@Transaction/portada.html.twig', array(
            'transactions' => $transactions,
            'user' => false
        ));
    }
}
