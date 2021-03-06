<template lang="pug">
    subpage
        v-container.pa-0.ma-0(fluid=true,
        no-gutters=true)
            v-row.mb-4(no-gutters=true,
            justify-left=true)
                v-col(:cols="6")
                    h1.display-1 Профил
                v-col.text-right(:cols="6")
                    v-tooltip(bottom=true)
                        template(v-slot:activator="{ on }")
                            v-btn(color="accent"
                            light
                            v-on="on"
                            href="/doku/strahinja-radic-cv.pdf"
                            target="_blank")
                                v-icon mdi-file-pdf-box
                                span.hidden-xs-only Преузми&nbsp;PDF
                        span Преузми PDF фајл

        v-card.profile-card(:class=`{
            'sm-and-up': $breakpoint.is.smAndUp,
        }`)
            v-toolbar(flat=true,
            :elevation="0",
            :color="pageTheme().cardTitleBackgroundColor")
                h2 Страхиња Радић
                v-avatar(v-if="$breakpoint.is.mdAndUp",
                size="96",
                :class=`{
                    'center-avatar-100': true
                }`)
                    v-img(src="/img/avatar-2017.webp",
                    alt="Аватар")
                v-avatar(v-else=true,
                size="60",
                :class=`{
                    'center-avatar-64': true,
                    'right-avatar-64': $breakpoint.is.xsOnly
                }`)
                    v-img(src="/img/avatar-2017.webp",
                    alt="Аватар")
            .py-7.mt-4
                p
                    em Full-stack developer
                    |  са широким опсегом програмерских
                    | вештина. Почео сам да кодирам у #[em Basic]-у деведесетих и
                    | научио низ програмских језика и фрејмворка, укључујући
                    | најновије технологије, као што су
                    = ' '
                    em Nuxt.js, Vue.js, Angular 2, Typescript, JavaScript, PHP
                    = ' '
                    |  и #[em MySQL.] Мој циљ је да радим на занимљивим и
                    |  захтевним пројектима уз употребу постојећих и нових
                    |  технологија. Текући фокус: #[em Nuxt.js.]

                //-Full-stack developer with a wide programming skill set.
                    Started coding with Basic in the 1990s and learned a
                    number of programming languages and frameworks, up to
                    and including modern technologies, like Nuxt.js, Vue.js,
                    Angular 2, Typescript, JavaScript, PHP and MySQL. My
                    goal is to work on interesting and challenging projects
                    using the  existing and/or new technologies. Current
                    focus: Nuxt.js.

                v-divider.my-8/

                h3.title(:class=`{
                    'px-10': $breakpoint.is.smAndUp,
                    'px-4': $breakpoint.is.xsOnly
                }`) Вештине

                v-divider.my-8/

                skills-category(title="Програмирање",
                :items-left="skillsLeftSide",
                :items-right="skillsRightSide",
                :two-col="true")

                v-divider.my-8/

                skills-category(title="Језици",
                :items-left="languages",
                :two-col="false")

                v-divider.my-8/

                h3.title(id="gpg-кључеви"
                :class=`{
                    'px-10': $breakpoint.is.smAndUp,
                    'px-4': $breakpoint.is.xsOnly
                }`) GPG кључеви

                p
                    | Ово су јавни GPG кључеви уз помоћ којих се може потврдити
                    | аутентичност порука које шаљем епоштом. Они су ограниченог
                    | рока трајања, а послао сам их и на неколико
                    | најпопуларнијих сервера за GPG кључеве.
                v-container.pa-0(fluid
                no-gutters)
                    v-row(no-gutters)
                        v-col.pl-0(:class=`{
                            'mx-10': $breakpoint.is.smAndUp,
                            'mx-4': $breakpoint.is.xsOnly
                        }`)
                            v-btn.mr-5.mb-5(href="/gmail.gpg"
                            target="_blank"
                            dark
                            color="primary")
                                v-icon mdi-file-key
                                | gmail.gpg
                            v-btn.mb-5(href="/strahinja-org.gpg"
                            target="_blank"
                            dark
                            color="primary")
                                v-icon mdi-file-key
                                | strahinja-org.gpg

</template>

<script>
import { routeIds } from '~/store/pages';
export default {
    name: 'Profile',
    data()
    {
        return {
            skillsLeftSide: [
                { name: 'Nuxt.js', color: 'blue lighten-1', percent: 80 },
                { name: 'Vue.js', color: 'blue lighten-1', percent: 90 },
                { name: 'Angular 2', color: 'purple lighten-1', percent: 70 },
                { name: 'JavaScript', color: 'red lighten-1', percent: 100 },
                { name: 'PHP', color: 'green lighten-1', percent: 95 }
            ],
            skillsRightSide: [
                { name: 'C', color: 'pink lighten-1', percent: 90 },
                { name: 'C++', color: 'pink darken-1', percent: 90 },
                { name: 'Pascal', color: 'blue darken-1', percent: 90 },
                { name: 'GNU/Linux', color: 'lime darken-1', percent: 90 }
            ],
            languages: [
                { name: 'Енглески', color: 'red', percent: 100 },
                { name: 'Руски', color: 'blue', percent: 80 },
                { name: 'Шпански', color: 'green', percent: 60 }
            ],
        };
    },
    computed:
    {
        page()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/pageById'](
                    this.$store.state.pages.pageId);
            }
            else
            {
                return null;
            }
        },
        parentUrl()
        {
            if (this && this.page)
            {
                return this.page.parentUrl;
            }
            return '/';
        },
        parentName()
        {
            if (this && this.page)
            {
                return this.page.parentName;
            }
            return 'почетну страницу';
        },
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    mounted()
    {
        this.$nextTick(() =>
        {
            this.$forceUpdate();
        });
    },
    methods:
    {
        pageTheme()
        {
            return this && this.$store
                ? this.$store.getters['themes/element'](
                    this.$store.getters['themes/theme'],
                    routeIds.PAGE_PROFILE
                )
                : {};
        },
    },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'

.v-avatar .v-image
    z-index: auto

.center-avatar-100
    position: absolute
    width: 96px
    height: 96px
    margin-bottom: -50px
    bottom: 0
    left: 50%
    margin-left: -50px

.center-avatar-100:before
    display: block
    content: ' '
    width: 100px
    height: 100px
    min-width: 100px
    left: -2px
    position: absolute
    border: 5px solid #fff
    border-radius: 50%
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .4)

.center-avatar-64
    position: absolute
    width: 60px
    height: 60px
    margin-bottom: -32px
    bottom: 0
    left: 50%
    margin-left: -32px

.center-avatar-64:before
    display: block
    content: ' '
    width: 64px
    height: 64px
    min-width: 64px
    left: -2px
    position: absolute
    border: 5px solid #fff
    border-radius: 50%
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .4)

.right-avatar-100
    margin-left: -110px
    left: 100%

.right-avatar-64
    margin-left: -70px
    left: 100%

.profile-card h2.title
    color: map-get($material-light, 'text-color')

.floating-button
    position: absolute
    bottom: 0
    margin-bottom: -50px

.floating-button-icon
    left: 50%
    top: 50%
    margin-left: -12px
    margin-top: -12px

.v-application .profile-card p
    margin: 8px 16px

.v-application .profile-card.sm-and-up p
    margin: 1em 2em
</style>
