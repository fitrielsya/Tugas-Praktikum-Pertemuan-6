// URL mengarah ke folder backend PHP
const API_URL = 'http://localhost/api-toko';

// MENGAMBIL DATA
async function muatData() {
    const res = await fetch(`${API_URL}/ambil_barang.php`);
    const data = await res.json();
    const tabel = document.getElementById('tabel-isi');
    
    tabel.innerHTML = '';
    
    if(data.length === 0) {
        tabel.innerHTML = '<tr><td colspan="3" class="p-4 text-center text-gray-400">Data barang masih kosong.</td></tr>';
        return;
    }

    data.forEach(item => {
        // Format uang Rupiah
        let hargaRupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.harga);
        
        tabel.innerHTML += `
            <tr class="hover:bg-gray-50 border-b">
                <td class="p-3">${item.nama_barang}</td>
                <td class="p-3 text-right">${hargaRupiah}</td>
                <td class="p-3 text-center">
                    <button onclick="siapkanEdit('${item.id}', '${item.nama_barang}', '${item.harga}')" class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded mr-2 hover:bg-yellow-200">Edit</button>
                    <button onclick="hapus('${item.id}')" class="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">Hapus</button>
                </td>
            </tr>`;
    });
}

// MENYIMPAN / UPDATE DATA
async function simpan() {
    const id = document.getElementById('id-barang').value;
    const nama = document.getElementById('nama').value;
    const harga = document.getElementById('harga').value;
    
    if(!nama || !harga) {
        alert("Nama barang dan harga harus diisi!");
        return;
    }
    
    // Tentukan file PHP yang dipanggil (Edit atau Tambah)
    const filePhp = id ? 'edit_barang.php' : 'tambah_barang.php';
    
    const res = await fetch(`${API_URL}/${filePhp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, nama_barang: nama, harga: harga })
    });

    const hasil = await res.json();
    alert(hasil.pesan);
    
    bersihkanForm();
    muatData();
}

// MENGHAPUS DATA
async function hapus(id) {
    if(confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        const res = await fetch(`${API_URL}/hapus_barang.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });
        
        const hasil = await res.json();
        alert(hasil.pesan);
        muatData();
    }
}

// MEMASUKKAN DATA KE FORM SAAT KLIK EDIT
function siapkanEdit(id, nama, harga) {
    document.getElementById('id-barang').value = id;
    document.getElementById('nama').value = nama;
    document.getElementById('harga').value = harga;
    document.getElementById('btn-simpan').textContent = "Update Data";
    document.getElementById('btn-simpan').classList.replace("bg-indigo-600", "bg-yellow-500");
    document.getElementById('btn-simpan').classList.replace("hover:bg-indigo-700", "hover:bg-yellow-600");
}

// MEMBERSIHKAN FORM SETELAH SIMPAN
function bersihkanForm() {
    document.getElementById('id-barang').value = '';
    document.getElementById('nama').value = '';
    document.getElementById('harga').value = '';
    document.getElementById('btn-simpan').textContent = "Simpan Data";
    document.getElementById('btn-simpan').classList.replace("bg-yellow-500", "bg-indigo-600");
    document.getElementById('btn-simpan').classList.replace("hover:bg-yellow-600", "hover:bg-indigo-700");
}

// LOAD DATA OTOMATIS
muatData();