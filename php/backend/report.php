<?php

include ('./connection.php');
include ('./../../assets/libraries/fpdf/fpdf.php');

    $sql="SELECT pod.idPurchaseOrderDetail,
    pod.idPurchaseOrder,
    pod.idItem,
    pod.itemPrice,
    pod.quantityItemPurchased,
    pur.idCard,
    pur.totalPrice,
    pur.date,
    uo.firstName,
    uo.lastName

    FROM purchaseordersdetails AS pod 
    JOIN purchaseorders AS pur ON pod.idPurchaseOrder=pur.idPurchaseOrder
    JOIN users AS uo ON pur.idCard=uo.idCard
    ";
    $resultado = $connection->query($sql);

    $pdf = new FPDF("P", "mm", "letter");
    $pdf->AddPage();
    $pdf->SetFont("Arial", "B", 12);
    $pdf->Cell(190, 5, "Reporte tablas PDF", 0, 1, "C");

    $pdf->Ln(2);

    $pdf->SetFont("Arial", "B", 9);

    $pdf->Cell(20, 5, "Id", 1, 0, "C");
    $pdf->Cell(30, 5, "Cedula", 1, 0, "C");
    $pdf->Cell(30, 5, "Nombre", 1, 0, "C");
    $pdf->Cell(30, 5, "Apellido", 1, 0, "C");
    $pdf->Cell(40, 5, "Dia", 1, 0, "C");
    $pdf->Cell(20, 5, "Precio", 1, 0, "C");
    $pdf->Cell(20, 5, "Cantidad", 1, 0, "C");
    $pdf->Cell(10, 5, "Total", 1, 1, "C");

    $pdf->SetFont("Arial", "", 9);

    while ($fila = $resultado->fetch_assoc()) {

        $pdf->Cell(20, 5, $fila['idPurchaseOrder'], 1, 0, "C");
        $pdf->Cell(30, 5, $fila['idCard'], 1, 0, "C");
        $pdf->Cell(30, 5, $fila['firstName'], 1, 0, "C");
        $pdf->Cell(30, 5, $fila['lastName'], 1, 0, "C");
        $pdf->Cell(40, 5, $fila['date'], 1, 0, "C");
        $pdf->Cell(20, 5, $fila['itemPrice'], 1, 0, "C");
        $pdf->Cell(20, 5, $fila['quantityItemPurchased'], 1, 0, "C");
        $pdf->Cell(10, 5, $fila['totalPrice'], 1, 1, "C");

    }

    $pdf->Output();

