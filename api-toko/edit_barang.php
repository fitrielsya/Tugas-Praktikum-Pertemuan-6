<?php
include "koneksi.php";
$data = json_decode(file_get_contents("php://input"), true);

if(!empty($data['id'])) {
    $id = mysqli_real_escape_string($koneksi, $data['id']);
    $nama = mysqli_real_escape_string($koneksi, $data['nama_barang']);
    $harga = mysqli_real_escape_string($koneksi, $data['harga']);
    
    $query = "UPDATE barang SET nama_barang='$nama', harga='$harga' WHERE id='$id'";
    if(mysqli_query($koneksi, $query)) {
        echo json_encode(["status" => "success", "pesan" => "Data berhasil diperbarui!"]);
    }
}
?>