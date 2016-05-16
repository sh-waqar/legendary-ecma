/**
 * Class constructor for Article details modal
 * All the interaction and template for modal is defined here
 */

class DetailModal {
  constructor() {
    // All the needed dom elements
    this.modalBox = document.getElementById('modal');
    this.times = document.getElementById('times');
    this.content = document.getElementById('article-content');
    this.related = document.getElementById('related-items');

    // When user click close (x) it removes the modal from view
    this.times.addEventListener('click', () => {
      this.dismiss.call(this);
    });
  }

  dismiss() {
    // Remove class from modal to hide it from view
    this.modalBox.classList.remove('show');
    // Remove overlay class to get the browser scrollbar back
    document.body.classList.remove('overlay');
    // Empty the content of modal
    this.content.innerHTML = '';
  }

  render(data) {
    // Add class to display modal on view
    this.modalBox.classList.add('show');
    // Add overlay class to remove browser scrollbar
    document.body.classList.add('overlay');
    // Render Content on view
    this.content.innerHTML =
      `<div class="article-img">
          <img src="${data.image.url}">
      </div>
      <div class="article-content">
        <h2>${data.title}</h2>
        <p class="text-muted">${data.publisher}</p>
        <article>${data.content}</article>
        <a href="${data.unescapedUrl}" target="blank">Read more</a>
      </div>`;

    // Check related stories
    // If available render on view
    // else hide the section
    if (data.relatedStories) {
      // Show the section
      this.related.classList.remove('hide');
      // Iterate over the list and render
      data.relatedStories.forEach(item => {
        var node = document.createElement('div');
        node.className = 'news-item';
        node.innerHTML =
          `<div class="article-main">
            <h2>${item.title}</h2>
            <div class="text-muted">${item.publisher}</div>
          </div>`;
        node.addEventListener('click', () => {
          window.open(item.unescapedUrl, "_blank")
        })
        this.related.appendChild(node);
      });
    }
    else {
      this.related.classList.add('hide');
    }
  }
}

// Export the module
export default DetailModal;
