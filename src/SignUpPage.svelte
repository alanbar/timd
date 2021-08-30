<script>
    import axios from 'axios'
    let disabled = true
    let username, email, password, passwordRepeat

    
    // const onChangePasswordRepeat = (event) => {
    //     passwordRepeat = event.target.value
    //     refreshDisabled()
    // }
    // const refreshDisabled = () => {

    $: disabled = (password && passwordRepeat) ? password !== passwordRepeat : true
        //disabled = password !== passwordRepeat
        // if(password === passwordRepeat){
        //     disabled = false
        // } else {
        //     disabled = true
        // }
    // }
    const submit = () => {
       axios.post('/api/1.0/users', { username, email, password})
    //    fetch('/api/1.0/users', {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify({ username, email, password }) 
    //     })   
    }                                                                                                                                                                                                                           
    
</script>

<form>
    <h1>Sign Up</h1>
    <label for="username">Username</label>
    <input id="username" bind:value={username}/>
    <label for="e-mail">E-mail</label>
    <input id="e-mail" bind:value={email}/>
    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} />
    <label for="password-repeat">Password Repeat</label>
    <input id="password-repeat" type="password" bind:value={passwordRepeat}/>
    <button disabled={disabled} on:click|preventDefault={submit}>Sign Up</button>
</form>