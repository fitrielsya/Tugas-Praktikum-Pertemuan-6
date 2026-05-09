<?php
include "koneksi.php";
$data = json_decode(file_get_contents("php://input"), true);

if(!empty($data['nama_barang']) && !empty($data['harga'])) {
    $nama = mysqli_real_escape_string($koneksi, $data['nama_barang']);
    $harga = mysqli_real_escape_string($koneksi, $data['harga']);
    
    $query = "INSERT INTO barang (nama_barang, harga) VALUES ('$nama', '$harga')";
    if(mysqli_query($koneksi, $query)) {
        echo json_encode(["status" => "success", "pesan" => "Barang berhasil disimpan!"]);
    }
} else {
    echo json_encode(["status" => "error", "pesan" => "Data tidak lengkap!"]);
}
?>