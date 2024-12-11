import Users from './UserModel.js';
import Articles from './ArticlesModel.js';
import Jobs from './JobsModel.js';

const models = {
  Users,
  Articles,
  Jobs
}

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;