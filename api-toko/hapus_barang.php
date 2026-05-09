<?php
include "koneksi.php";
$data = json_decode(file_get_contents("php://input"), true);

if(!empty($data['id'])) {
    $id = mysqli_real_escape_string($koneksi, $data['id']);
    
    $query = "DELETE FROM barang WHERE id='$id'";
    if(mysqli_query($koneksi, $query)) {
        echo json_encode(["status" => "success", "pesan" => "Data berhasil dihapus!"]);
    }
}
?>