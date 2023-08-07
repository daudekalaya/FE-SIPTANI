module.exports = (amount) => {
  try {
    // Pastikan amount adalah angka (number)
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'Invalid amount';
    }

    // Pisahkan angka menjadi bagian desimal dan bagian bulat
    const integerPart = Math.floor(amount);
    const decimalPart = (amount % 1).toFixed(2).slice(2); // Ambil dua digit di belakang koma

    // Format bagian bulat dengan pemisah ribuan
    const formattedIntegerPart = integerPart.toLocaleString('id-ID');

    // Gabungkan kembali bagian bulat dan desimal
    const formattedAmount = 'Rp ' + formattedIntegerPart + (decimalPart > 0 ? ',' + decimalPart : '');

    return formattedAmount;
  } catch (e) {
    console.log('Error > ' + e);
    return 'Invalid amount';
  }
};
