export function instagram () {

  const $list = $('.js-insta')
  let token = $list.data('token')
  const createList = (post: any) => {

    const block = `
    <li class="m-insta__item">
      <a href="${post.link}" target="_blank" style="background-image: url(${post.images.standard_resolution.url})"></a>
    </li>
    `
    $list.append(block)
  }

  $(function () {
    const count = 10

    $.ajax({
      url: `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}&amp;count=${count}`,
      dataType: 'jsonp'
    }).done(function (evt: any) {
      console.log(evt)

      const post = evt.data

      if (!post) return

      for (let i = 0; i < post.length; i++) {
        createList(post[i])
      }

    })
  })
}
