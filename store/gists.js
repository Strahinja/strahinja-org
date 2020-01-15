import gistIds from '../static/blog/blog-gist-ids.json';

export const state = () => ({
    list: [],
    debug: process.env.VUE_APP_MODE == 'staging',
    cacheDir: 'static/blog/gist-cache',
    cachePath: '/blog/gist-cache',
});

export const mutations = {
    addGist(state, payload)
    {
        state.list.push(payload);
    }
};

export const getters = {
    loadedGistsCount: state => state.list.length,
    gistById: state => gistId => state.list.find(
        gist => gist.data.id == gistId),
    debug: state => state.debug,
    cacheDir: state => state.cacheDir,
    cachePath: state => state.cachePath,
};

export const actions = {
    async loadGists({ dispatch, getters })
    {
        for (let gistId of gistIds)
        {
            if (!getters['gistById'](gistId))
            {
                await dispatch('loadGist', { gistId });
            }
        }
    },
    async loadGist({ commit, getters }, { gistId })
    {
        let cacheFileName = getters['cacheDir'] + `/${gistId}.json`;
        let gist = null;
        try
        {
            gist = await this.$axios.$get(process.env.VUE_APP_BROWSER_API_HOST +
                '/' +cacheFileName);
        }
        catch(e)
        {
            console.error('store/gists: axios error: ', e);
        }
        if (gist)
        {
        // TODO: Instead of fs use axios
        let gist = null;
        try
        {
            gist = await this.$axios.$get(getters['cachePath'] + `/${gistId}.json`);
        }
        catch(e)
        {
            console.error('store/gists: axios cache error: ', e);
        }
        if (gist)
        {
            commit('addGist', {
                gistId: gistId,
                data: gist,
            });
            return gist;
        }
        //console.log(`store/gists: Gist ${gistId} not cached, fetching by axios instead`);
        try
        {
            let debug = getters['debug'];
            if (!debug)
            {
                gist = await this.$axios.$get(
                    `https://api.github.com/gists/${gistId}`);
                if (gist)
                {
                    commit('addGist', {
                        gistId: gistId,
                        data: gist
                    });
                    /*try
                    {
                        // TODO: PHP API call
                        //fs.writeFileSync(cacheFileName, JSON.stringify(gist));
                    }
                    catch(e)
                    {
                        console.error('store/gists: writeFileSync error: ', e);
                    }*/
                    return gist;
                }
            }
            else
            {
                commit('addGist', {
                    gistId: gistId,
                    data: {}
                });
                return {};
            }
        }
        catch (e)
        {
            console.log('store/gists.js.loadGist: ', e);
        /*commit('addGist', {
            gistId: gistId,
            data: {}
        });
        return {};*/
        }
        return null;
    }
};

