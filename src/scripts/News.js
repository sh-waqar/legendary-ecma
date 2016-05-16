var DetailModal = require('./detailModal');
var modal = new DetailModal();

class News {
  constructor(data, dom) {
    this.data = data;
    this.domId = dom.getId();
  }

  getDate() {
    var date = new Date(this.data.publishedDate);
    return date.toLocaleTimeString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  event() {
    modal.render(this.data);
  }

  hide() {
    document
      .querySelector(`[dom-id="${this.domId}"]`)
      .classList.add('hide');
  }

  show() {
    document
      .querySelector(`[dom-id="${this.domId}"]`)
      .classList.remove('hide');
  }

  template() {
    return `<div class="article-main">
              <h2>${this.data.title}</h2>
              <div class="text-muted">${this.data.publisher}</div>
            </div>
            <div class="article-publisher">
              <div>${this.getDate()}</div>
            </div>`;
  }

  render() {
    var item = document.createElement('div');
    item.className = 'news-item';
    item.setAttribute('dom-id', this.domId);
    item.innerHTML = this.template();
    item.addEventListener('click', () => {
      this.event.call(this);
    });
    return item;
  }
}

// Export the module
export default News;
