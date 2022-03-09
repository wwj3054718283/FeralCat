<template>
    <div id="FeralCat">
        <div id="header">
            <div class="content">
                <div id="logo">
                    <img src="../assets/img/icon.png" alt="" />
                </div>
                <div id="nav">
                    <ul>
                        <li>
                            <a href="#_1" name="1" @click="handleSmooth"
                                >首页</a
                            >
                        </li>
                        <li>
                            <a href="#_2" name="2" @click="handleSmooth"
                                >关于我们</a
                            >
                        </li>
                        <li>
                            <a href="#_3" name="3" @click="handleSmooth"
                                >我们的工作</a
                            >
                        </li>
                        <li>
                            <a href="#_4" name="4" @click="handleSmooth"
                                >知识中心</a
                            >
                        </li>
                        <li>
                            <a href="#_5" name="5" @click="handleSmooth"
                                >照片墙</a
                            >
                        </li>
                        <li>
                            <a href="#_6" name="7" @click="handleSmooth"
                                >领养流程</a
                            >
                        </li>
                        <li>
                            <a href="#_7" name="8" @click="handleSmooth"
                                >联系我们</a
                            >
                        </li>
                        <li><a @click="goHome">后台管理</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="container">
            <ul>
                <li>
                    <div id="_1" class="_image_1">
                        <el-carousel
                            height="800px"
                            direction="vertical"
                            :autoplay="false"
                        >
                            <el-carousel-item
                                v-for="(row, index) in srcs"
                                :key="index"
                            >
                                <img :src="row" />
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="_text_1">
                        <h2>以领养代替购买</h2>
                        <p>请尽力帮助他们告别哀伤面向阳光</p>
                        <p>他们在等待人给予它们关爱</p>
                    </div>
                </li>
                <li>
                    <div id="_2">
                        <div class="_text_2">
                            <h3>————关于我们————</h3>
                            <p>
                                由于猫主子的照顾不周或者时间不够，大量被遗弃的流浪猫在城市间游荡，引发一系列人与流浪猫之间的矛盾，正值互联网迅速发展的浪潮，本流浪猫救助系统利用互联网大量用户和对信息的快速传递，来帮助更多的人去注意到身边的流浪猫，施予援手，让救助更及时，也便流浪猫迅速找到新家，促进人与流浪猫的和谐相处。
                            </p>
                        </div>
                        <div class="_image_2">
                            <img src="../assets/img/aboutCat.jpg" alt="" />
                        </div>
                    </div>
                </li>
                <li>
                    <div id="_3">
                        <h3>————我们的工作————</h3>
                        <div class="box">
                            <div class="image">
                                <img src="../assets/img/rescue.png" alt="" />
                            </div>
                            <div class="text">
                                <h3>收养流浪猫狗</h3>
                                <p>
                                    我们会定时去各个地方查看流浪猫狗的存在，只要我们发现了都会带回附近的救助机构收养。
                                </p>
                            </div>
                            <div class="text">
                                <h3>健康的保障</h3>
                                <p>
                                    收养的流浪猫狗，我们会先帮助它们基本的驱虫，然后为它们检查是否有疾病，并保障它们良好的身体健康。
                                </p>
                            </div>
                            <div class="image">
                                <img src="../assets/img/treat.png" alt="" />
                            </div>
                            <div class="image">
                                <img src="../assets/img/home.png" alt="" />
                            </div>
                            <div class="text">
                                <h3>帮助找新家</h3>
                                <p>
                                    我们会给健康的流浪猫狗，找到适合它们的新家庭，领养人我们会经过严格的筛选，达到我们的条件才能成功的领养。
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div id="_4">
                        <h3>————知识中心————</h3>
                        <div
                            class="content"
                            v-for="(item, index) in konws"
                            :key="index"
                        >
                            <div class="head">
                                <h3>{{ item.title }}</h3>
                                <span>{{ item.data }}</span>
                            </div>
                            <p>{{ item.content }}</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div id="_5">
                        <h3>————照片墙————</h3>
                        <p>这里是我们救助过的流浪猫狗们。</p>
                        <div class="imgBox">
                            <div v-for="(row, index) in imgbox" :key="index">
                                <img :src="row" alt="" />
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div id="_6">
                        <h3>————领养流程————</h3>
                        <p>
                            我们会对领养人的能力严格审查，以给它们一个健康安全的成长环境。
                        </p>
                        <div class="flexbox">
                            <div
                                class="sixbox"
                                v-for="(row, index) in siximg"
                                :key="index"
                            >
                                <div class="imgbox">
                                    <img :src="row[1]" alt="" />
                                </div>
                                <p>{{ row[0] }}</p>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div id="_7">
                        <h3>————联系我们————</h3>
                        <p>
                            如有相关事宜，请按以下方式给我们留言，或门店造访。
                        </p>
                        <div
                            class="icons"
                            v-for="(row, index) in sevenimg"
                            :key="index"
                        >
                            <img :src="row[1]" alt="" />
                            <p>{{ row[0] }}</p>
                        </div>
                    </div>
                </li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "FeralCat",
    data() {
        return {
            srcs: [
                require("../assets/img/catHeader3.jpg"),
                require("../assets/img/catHeader1.jpg"),
                require("../assets/img/catHeader.jpg"),
            ],
            imgbox: [
                require("../assets/img/catPicture1.jpg"),
                require("../assets/img/catPicture2.jpg"),
                require("../assets/img/catPicture3.jpg"),
                require("../assets/img/catPicture4.jpg"),
                require("../assets/img/catPicture5.jpg"),
                require("../assets/img/catPicture6.jpg"),
                require("../assets/img/catPicture7.jpg"),
                require("../assets/img/catPicture8.jpg"),
                require("../assets/img/catPicture9.jpg"),
                require("../assets/img/catPicture10.jpg"),
                require("../assets/img/catPicture11.jpg"),
                require("../assets/img//catPicture12.jpg"),
            ],
            siximg: [
                [
                    " 领养人须年满22岁，有稳定的工作稳定的收入和住房（不符条件：未满22岁/学生/合租/店铺不建议领养） ",
                    require("../assets/img/adopt1.png"),
                ],
                [
                    " 领养人要爱护看护好动物，家里有防护栏防护。领养宠物须在一年内完成绝育和接受固定10次回访。 ",
                    require("../assets/img/adopt2.png"),
                ],
                [
                    "领养动物须在一年之内完成动物绝育（请及时把绝育时的照片以及医院票据发给回访人员，以便登记）",
                    require("../assets/img/adopt3.png"),
                ],
                [
                    " 领养人不得因为任何理由遗弃或私下转送领养宠物，为方便回访管理，领养人勿私下将领养猫带离主城。 ",
                    require("../assets/img/adopt4.png"),
                ],
            ],
            konws: [
                {
                    title: "猫咪狗狗有些小病小痛第一时间该怎么办",
                    content:
                        "关于猫咪： 1.猫咪发生呕吐的时候怎么办？ 首先要看猫咪是因为什么症状而发生这种情况的，吐毛球？肠胃不适？吃错东西？ 要看猫咪吐出的是什么，如果是毛球那就不需要大惊小怪，给猫咪买一些化毛膏之类的混在猫粮吃就可以，或者有化毛成分的猫粮，如果猫咪是吃错东西或者肠胃不适引起的可以禁食（包括水）不要心疼！24小时看看猫咪还会不会发生呕吐，然后再喂一些流质的食物（比如猫粮混点水泡软了）如果猫咪持续发生呕吐这个时候就可以带去医院了。 2.猫咪拉肚子怎么办？ 首先看猫咪拉的是血水、拉稀还是拉虫 血水很可能是尿毒症、这个是非常重要的事情！楼主其中一只猫咪就因为这个问题没处理好所以。。。。去天堂了...",
                    data: "2017年4月19日",
                },
                {
                    title: "关于狗狗的常见病",
                    content:
                        "关于狗狗耳朵的护理 可卡——可卡的耳病问题一直以来在全世界所有品种的犬中排行靠前。因此从小养成清洗耳道的习惯对于可卡的耳道疾病预防至关重要。 关于可卡，我有一点需要强调，那就是它的耳朵问题。可卡很皮实，但是唯独耳病问题一直以来在全世界所有品种的犬中排行靠前。可以说这相当于形成了它的品种病。它的耳廓长，吃东西喝水的时候容易搭拉到饭盆内，长期下来容易使耳尖骚痒、病变。同时由于耳道不透气，容易滋生细菌、真菌等病原，致使耳道发炎，耳垢腺发炎，耳道增生，耳道皮肤化脓，甚至发展至中耳炎和内耳炎。在很多病例由于不注意清洗耳朵，在短短的2个月时间内双侧耳道就能因为外耳道皮肤增生而发生完全堵塞。因此从...",
                    data: "2017年4月19日",
                },
                {
                    title: "如何帮宝贝们养成良好的生活习惯",
                    content:
                        "自从我当了宠物医生以后身边总是有很多朋友问我很多关于养狗的问题， 比如为什么家里狗狗挑食， 为什么就是不听话，怎么在家里随地大小便，很多很多诸如此类的问题。 其实我想说狗狗就和小孩子一样，需要非常多的耐心甚至比养一个小孩还多的耐心去教会他们如何按照你所要求的方式生活。 很多家长会有很强烈的母系情节，会很溺爱我们的宝贝，不舍得说不舍教育，或者忙于生活，忙于学业只要平时宝贝们不太出格也就放任自流。 那今天小编就在这里为大家简单说一下如何帮宝贝们养成良好的生活习惯。 首先饮食， 一般来说狗狗不需要像人一样一日三餐，大部分的狗狗一天只需一顿到两顿就好， 按照狗狗的重量和大小每袋食物上都有...",
                    data: "2016年6月19日",
                },
            ],
            sevenimg: [
                [
                    "四川省绵阳市涪城区888号 ",
                    require("../assets/img/adress.png"),
                ],
                ["15775666538 ", require("../assets/img/tel.png")],
                ["2098213666@qq.com ", require("../assets/img/email.png")],
            ],
            scrollTop: {},
        };
    },
    methods: {
        goHome() {
            this.$router.push("/home");
        },
        handleSmooth(e) {
            console.log(e.path[0].attributes[1].value);
            // let n = e.path[0].attributes[1].value
            // document.getElementById("_"+n).scrollIntoView({block:"start",behavior:"smooth"})
            // console.log(document.getElementById("_"+n));
        },
        scroll() {
            this.scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            console.log(this.scrollTop);
            let elflxed = document.getElementById("nav");
            if (this.scrollTop >= 126) {
                elflxed.setAttribute("style", "position:fixed");
                elflxed.setAttribute("style", "top:0");
            } else {
                elflxed.setAttribute("style", "position: static");
            }
        },
    },
    mounted() {
        document.addEventListener("scroll", this.scroll);
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.scroll);
    },
};
</script>

<style lang="less">
a {
    font-size: 15px;
}
#FeralCat {
    -webkit-animation-duration: 0.1s;
    -webkit-animation-name: fontfix;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: linear;
    -webkit-animation-delay: 0.1s;
    min-height: 100vh;
    #header {
        height: 186px;
        width: 100vw;
        .content {
            width: 80%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            #logo {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                img {
                    width: 100px;
                    height: 100px;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
            }
            #nav {
                width: 100vw;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background-color: #fff;
                position: fixed;
                z-index: 999999;
                top: 0;
                ul {
                    width: 60%;
                    height: 60px;
                    margin: 0 auto;
                    line-height: 60px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    background-color: #fff;
                    li {
                        a {
                            scroll-behavior: smooth;
                        }
                    }
                }
            }
        }
    }
    #container {
        width: 100vw;
        position: absolute;
        ul {
            li {
                position: relative;
                ._text_1 {
                    width: 30vw;
                    position: relative;
                    top: -70vh;
                    left: 55vw;
                    opacity: 99999;
                    z-index: 99999999;
                    text-align: right;
                    color: #fff;
                    h2 {
                        font-size: 45px;
                    }
                    p {
                        font-size: 30px;
                        font-weight: bold;
                    }
                }
                #_2 {
                    width: 55%;
                    margin: -15vh auto;
                    ._text_2 {
                        h3 {
                            font-size: 36px;
                            text-align: center;
                            margin-bottom: 10px;
                        }
                        p {
                            font-size: 20px;
                            margin-bottom: 10px;
                        }
                    }
                }
                #_3 {
                    width: 55%;
                    margin: 20vh auto;
                    h3 {
                        font-size: 36px;
                        text-align: center;
                        margin-bottom: 10px;
                    }
                    .box {
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        h3 {
                            font-size: 24px;
                        }
                        p {
                            font-size: 15px;
                        }
                        .image {
                            width: 40%;
                        }
                        .text {
                            width: 60%;
                        }
                    }
                }
                #_4 {
                    width: 55%;
                    margin: -15vh auto;
                    h3 {
                        font-size: 36px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .content {
                        margin-top: 20px;
                        .head {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            h3 {
                                font-size: 24px;
                            }
                            span {
                                color: #f00;
                            }
                        }

                        p {
                            font-size: 15px;
                        }
                    }
                }
                #_5 {
                    width: 100%;
                    margin: 20vh auto;
                    h3 {
                        font-size: 36px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 20px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .imgBox {
                        display: flex;
                        flex-wrap: wrap;
                        div {
                            width: 100/6vw;
                        }
                    }
                }
                #_6 {
                    width: 55%;
                    margin: -15vh auto;
                    h3 {
                        font-size: 36px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 20px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .flexbox {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .sixbox {
                            width: 22%;
                            p {
                                font-size: 15px;
                            }
                        }
                    }
                }
                #_7 {
                    width: 55%;
                    margin: 20vh auto 0 auto;
                    text-align: center;
                    h3 {
                        font-size: 36px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 20px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .icons {
                        width: 100%;

                        img {
                            width: 3%;
                            display: inline-block;
                        }
                        p {
                            display: inline-block;
                            font-size: 15px;
                        }
                    }
                }
            }
        }
    }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
img {
    width: 100%;
    height: 100%;
}
@keyframes fontfix {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}
</style>
