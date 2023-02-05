'use strict';

{
  // ハンバーガーメニュー
  // .sp-menu(#open), pc-menu, .overlay(#close) をスタイリングすること（※メディアクエリあり）。
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const links = document.querySelectorAll('.overlay a');

  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      close.click();
      window.scrollTo({
        top: -100,
        behavior: 'smooth',
      });
    });
  });
}

{
  // ふわっと表示
  // Intersection Observer API
  const targets = document.querySelectorAll('.animate');

  function callback(entries, obs) {
    console.log(entries); // IntersectionObserverEntry 確認用

    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
  
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }

  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(callback, options);

  targets.forEach(target => {
    observer.observe(target);
  });
}

{
  // パターン2: onScrollCallback()...header を固定配置する。
  // Intersection Observer API

  const header = document.querySelector('header');

  function onScrollCallback(entries) {
    // console.log(entries); // check用
    // ※header, header.scrolled をスタイリングすること。
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        header.classList.add('scrolled'); // 少しでもスクロールした状態。
      } else {
        header.classList.remove('scrolled'); // トップにいる（スクロールしていない）状態。
      }
    });
  }

  const onScrollObserver = new IntersectionObserver(onScrollCallback); // 第2引数の options は省略。

  const target = document.getElementById('target'); // 空要素が target。
  // ※header 直後に空要素を配置すること。

  onScrollObserver.observe(target);
}


{
  // パターン3: onScrollCallback()...トップに戻るボタンを作る。
  // Intersection Observer API

  const toTop = document.getElementById('to_top');

  function onScrollCallback(entries) {
    // console.log(entries); // check用
    // ※ #to_top, #to_top.scrolled, #to_top i をスタイリングすること。
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        toTop.classList.add('scrolled'); // 少しでもスクロールした状態。
      } else {
        toTop.classList.remove('scrolled'); // トップにいる（スクロールしていない）状態。
      }
    });
  }

  const onScrollObserver = new IntersectionObserver(onScrollCallback); // 第2引数の options は省略。

  const target = document.getElementById('target'); // 空要素が target（監視対象は header と同じ）。
  // ※header 直後に空要素を配置すること。

  onScrollObserver.observe(target);

  toTop.addEventListener('click', e => {
    e.preventDefault(); // URLの末尾の「#」を削除（a タグによる「トップに戻る」も解除される。）。

    window.scrollTo({ // 「トップに戻る」を再設定。
      top: 0,
      behavior: 'smooth',
    });
  });
}