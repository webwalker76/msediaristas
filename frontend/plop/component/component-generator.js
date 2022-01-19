module.exports = function(plop){
    plop.setGenerator('component',{
        description:'componente',
        prompts:[{
            name:'name',
            type:'inputs',
            message:'Nome do Componente',

        },
     {
         name:'type',
         type:'list',
        message:'Tipo do Componente:',
        choices:[
            {
                name:'Data Display',
                value:'data-display',
            },
            {
                name:'Feedback',
                value:'feedback',
            },    
            {
                name:'inputs',
                value:'inputs',
            },
            {
                name:'Navigation',
                value:'navigation',
            },
            {
                name:'Surface',
                value:'surface',
            },

        ]
     }
    ],
    actions(data){//data contém todas as variáveis da criação dos componentes
        const basePath =`src/ui/components/${data.type}/${data.name}/`;
        const actions =[
            {
                type:'add',
                path: `${basePath}/${data.name}.tsx`,
                templateFile:'plop/component/component-template.hbs'
            },
            {
                type:'add',
                path: `${basePath}/${data.name}.style.tsx`,
                templateFile:'plop/component/component-style-template.hbs'

            },
            {
                type:'add',
                path: `${basePath}/${data.name}.stories.tsx`,
                templateFile:'plop/component/component-story-template.hbs'

            },
            {
                type:'add',
                path: `${basePath}/${data.name}.test.tsx`,
                templateFile:'plop/component/component-test-template.hbs'

                }
        ];
        return actions;
    }
    })
}
