<?php

namespace Finance\TransactionBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncode;

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

        return new JsonResponse($transactions);
    }

    public function allTransactionAction(){

        $em = $this->getDoctrine()->getManager();

        $transactions = $em->getRepository('TransactionBundle:Transaction')->findAll();

        return new JsonResponse($transactions);
    }
}
