document.addEventListener('mousemove', function(event) {
    var customCursor = document.querySelector('.custom-cursor');
    customCursor.style.left = event.clientX + 'px';
    customCursor.style.top = event.clientY + 'px';
  });
  