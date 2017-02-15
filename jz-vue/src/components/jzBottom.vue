<template>
    <div class="footer">
        <div class="f_inner">
            <ul>
                <li>
                    <router-link to="/one">one</router-link>
                </li>
                <li>
                    <router-link to="/two">two</router-link>
                </li>
                <li>
                    <router-link to="/three">three</router-link>
                </li>
                <li>
                    <router-link to="/four">four</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
    .footer {
        height: 55px;
        line-height: 55px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 7000;
        background-color: #35bcdc;
        color: #fff;
        font-size: 0.1rem;
    }
    .footer ul{
        list-style: none;
        display: table;
        width: 100%;
        margin: 0 auto;
    }
    .footer li {
        display: table-cell;
        width: 25%;
        list-style: none;
        text-align: center;
        color: #fff;
    }
    .footer li a {color: #fff;}
</style>