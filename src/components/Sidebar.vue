<template>
    <div class="sidebar">
      <div class="text-h3 font-weight-bold title"> WEB APP </div>
      <div class="menu-items">
            <router-link to="/" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Medicines
                </div>
            </router-link>
            <router-link to="/add" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Add Medicine
                </div>
            </router-link>
            <router-link to="/update" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Update By Medicine Id
                </div>
            </router-link>
            <router-link to="/code" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Update By Barcode
                </div>
            </router-link>
        </div>
    </div>

</template>

<script>
export default {
    
}
</script>

<style scoped>

.sidebar {
  background-color: cornflowerblue;
}

.title {
    color: white;
    /*//font-size: 40px;*/
    margin-top: 10px;
    text-align: center;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 6px;
}

.menu-items > * {
    margin-top: 60px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: cornflowerblue;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before, .side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before, .side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: cornflowerblue;
}
</style>
