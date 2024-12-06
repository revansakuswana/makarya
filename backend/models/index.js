import Users from './UserModel.js';
import Articles from './ArticlesModel.js';

const models = {
  Users,
  Articles,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;