<script>

  let userLog

  if(typeof window !== 'undefined') {
    userLog = JSON.parse(localStorage.getItem('user'))
  }

  $: console.log(userLog)

</script>
