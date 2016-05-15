class DetailModal {
  constructor() {
    this.modalBox = document.getElementById('modal');
    this.times = document.getElementById('times');
    this.content = document.getElementById('modal-content');

    this.times.addEventListener('click', () => {
      this.dismiss.call(this);
    });
  }

  dismiss() {
    this.modalBox.classList.remove('show');
    this.content.innerHTML = '';
  }

  render(data) {
    this.modalBox.classList.add('show');
    this.content.innerHTML = `${data.title}`;
  }
}

// Export the module
export default DetailModal;