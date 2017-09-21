<template>
    <div class="body">
        <!--<div class="header">-->
        <!--<img v-bind:src="imgUrl" alt="logo" class="logo"/>-->
        <!--<p class="">{{ message }}</p>-->
        <!--</div>-->
        <header class="main-header"
                style="background-image: url(http://image.golaravel.com/5/c9/44e1c4e50d55159c65da6a41bc07e.jpg)">
            <div class="container">
                <div class="row">
                    <h1>shadowBlog</h1>
                </div>
                <div class="title row">
                    <div class="desc col-xs-12"><h3><span class="hide">Laravel - </span>为 WEB 艺术家创造的 PHP 框架。</h3>
                    </div>
                </div>

            </div>
        </header>
        <div class="row">
            <nav class="main-navigation">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="navbar-header"><span class="nav-toggle-button collapsed"
                                                             data-toggle="collapse"
                                                             data-target="#main-menu"><span class="sr-only">Toggle navigation</span> <i
                                    class="fa fa-bars"></i></span></div>
                            <div class="collapse navbar-collapse" id="main-menu">
                                <ul class="menu">
                                    <li role="presentation"><a href="/" title="首页">首页</a></li>
                                    <li role="presentation"><a href="https://docs.golaravel.com/docs/"
                                                               title="Laravel 中文文档" target="_blank"
                                                               onclick="_hmt.push(['_trackEvent', 'main-navigation', 'click', 'Laravel 中文文档'])">Laravel
                                        中文文档</a></li>
                                    <li role="presentation" style="font-weight: bold"><a
                                            href="https://pkg.phpcomposer.com/" title="Packagist 中国镜像"
                                            target="_blank"
                                            onclick="_hmt.push(['_trackEvent', 'main-navigation', 'click', 'Packagist 中国镜像'])">Packagist
                                        中国镜像</a></li>
                                    <li role="presentation"><a href="http://www.phpcomposer.com/"
                                                               title="Composer 中文文档" target="_blank"
                                                               onclick="_hmt.push(['_trackEvent', 'main-navigation', 'click', 'Composer 中文文档'])">Composer
                                        中文文档</a></li>
                                    <li role="presentation"><a href="https://php.golaravel.com/"
                                                               title="PHP 中文手册" target="_blank"
                                                               onclick="_hmt.push(['_trackEvent', 'main-navigation', 'click', 'PHP 中文手册'])">PHP
                                        中文手册</a></li>
                                    <li role="presentation"><a href="https://phptherightway.golaravel.com/"
                                                               title="PHP 编程之道" target="_blank"
                                                               onclick="_hmt.push(['_trackEvent', 'main-navigation', 'click', 'PHP 编程之道'])">PHP
                                        编程之道</a></li>
                                    <li role="presentation"><a href="http://wenda.golaravel.com/" title="问答社区"
                                                               target="_blank"
                                                               onclick="_hmt.push(['_trackEvent', 'main-navigation', 'click', '问答社区'])">问答社区</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="content-wrap">
            <div class="content row">
                <div class="col-md-8">
                    <nuxt/>
                </div>
                <div class="col-md-4 sidebar">
                    <div class="widget"><h4 class="title">社区</h4>
                        <div class="content community"><p>QQ群：462694081</p>
                            <p><a href="http://wenda.golaravel.com/" title="Laravel中文网问答社区" target="_blank"
                                  onclick="_hmt.push(['_trackEvent', 'big-button', 'click', '问答社区'])"><i
                                    class="fa fa-comments"></i> 问答社区</a></p></div>
                    </div>
                </div>
            </div>
        </div>

    </div>


</template>
<script>
import axios from '~/plugins/axios'
export default {
    async asyncData() {
        let { data } = await axios.get('api')
        return { message: data.message }
        return { imgUrl: data.url }
    },
    data: function() {
        return {
            imgUrl: '',
            message: ''
        }
    }
}
</script>
<style>
    .header {
        width: 100%;
        height: 200px;
    }

    .title > .desc {
        padding-left: 100px;
    }

    .main-navigation {
        text-align: center;
        background: #fff;
        border-top: 1px solid #ebebeb;
        margin-bottom: 35px;
        border-bottom: 2px solid #e1e1e1;
    }

    .main-navigation .menu li {
        list-style: none;
        display: inline-block;
        position: relative;
    }

    .main-navigation .menu li a {
        color: #505050;
        line-height: 4em;
        display: block;
        padding: 0 21px;
    }
    .body {
        background: #ebebeb;
    }
    .content {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        height: 700px;
    }


    .sidebar .widget {
        background: #fff;
        padding: 21px 30px;
        height: 140px;
    }

    .widget .title {
        margin-top: 0;
        padding-bottom: 7px;
        border-bottom: 1px solid #ebebeb;
        margin-bottom: 21px;
        position: relative;
    }
</style>

