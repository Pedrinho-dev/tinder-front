<template>
    <nav class="menu">
        <ul class="menu-list">
            <li class="menu-item">
                <router-link to="/home">
                    <i class="mdi mdi-home"></i>
                </router-link>
            </li>
            <li class="menu-item">
                <router-link to="/likes">
                    <i class="mdi mdi-thumb-up"></i>
                </router-link>
            </li>
            <li class="menu-item">
                <router-link to="/matches">
                    <i class="mdi mdi-heart"></i>
                </router-link>
            </li>
            <li class="menu-item">
                <router-link to="/account">
                    <i class="mdi mdi-account"></i>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Menu",
};
</script>

<style scoped>
.menu-list {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.menu-item {
    margin-right: 20px;
}

.menu-item a {
    color: white;
    text-decoration: none;
    font-size: 24px;
}

.menu-item a:hover {
    color: #ff4081;
}
</style>