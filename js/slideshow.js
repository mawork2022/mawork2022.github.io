'use strict';

{
  // ver.3 変更点
  // ※メイン画像: src属性の値を変更して切り替え => HTMLにimgを追加（これにより画像がふわっと切り替わるアニメーションを実装できた）。
  // #playボタンを追加。#prev, #nextのスタイリング変更。
  // function で処理をある程度まとめた。
  const images = document.querySelectorAll('.container-main img');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  // const play = document.getElementById('play');
  let activeIndex = 0;

  function updateImages() {
    images.forEach(image => {
      image.classList.remove('active');
    });
    images[activeIndex].classList.add('active');
  }

  function updateThumbnails() {
    thumbnails.forEach(thumbnail => {
      thumbnail.classList.remove('active');
    });
  }

  // thumbnail画像: forEach文で作成
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.addEventListener('click', () => {
      activeIndex = i;
      updateImages();
      updateThumbnails();
      thumbnail.classList.add('active');
    });
  });

  // thumbnail画像: for文で作成
  // for (let i = 0; i < thumbnails.length; i++) {
  //   thumbnails[i].addEventListener('click', () => {
  //     activeIndex = i;
  //     updateImages();

  //     for (let i = 0; i < thumbnails.length; i++) {
  //       thumbnails[i].classList.remove('active');
  //     }
  //     thumbnails[i].classList.add('active');
  //   });
  // }

  // nextボタン
  next.addEventListener('click', () => {
    activeIndex++;
    if (activeIndex > thumbnails.length - 1) {
      activeIndex = 0;
    }
    updateImages();
    updateThumbnails();
    thumbnails[activeIndex].classList.add('active');
  });

  // prevボタン
  prev.addEventListener('click', () => {
    activeIndex--;
    if (activeIndex < 0) {
      activeIndex = thumbnails.length - 1;
    }
    updateImages();
    updateThumbnails();
    thumbnails[activeIndex].classList.add('active');
  });

  // 自動再生
  function playSlideshow() {
    setTimeout(() => {
      // nextボタンの処理と同じ。
      activeIndex++;
      if (activeIndex > thumbnails.length - 1) {
        activeIndex = 0;
      }
      updateImages();
      updateThumbnails();
      thumbnails[activeIndex].classList.add('active');
      playSlideshow();
    }, 9000);
  }

  playSlideshow();

  // Playボタンで再生
  // let timeoutId;

  // function playSlideshow() {
  //   timeoutId = setTimeout(() => {
  //     next.click();
  //     playSlideshow();
  //   }, 5000);
  // }

  // let isPlaying = false;

  // play.addEventListener('click', () => {
  //   if (isPlaying === false) {
  //     playSlideshow();
  //     play.textContent = 'Pause';
  //   } else {
  //     clearTimeout(timeoutId);
  //     play.textContent = 'Play';
  //   }
  //   isPlaying = !isPlaying;
  // });
}
