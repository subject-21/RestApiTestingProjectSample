const Actions = require("../../../api/axios")

describe('metaphysics graphql', () => {
  const API_ACTIONS = new Actions();
  const query = `{
      allFilms {
        films {
          title
        }
      }
  }`;

  beforeAll(() => {
    API_ACTIONS.requestOptions.baseURL = "http://localhost:58862/";
  });

  it('should get popular artists', async () => {
    await API_ACTIONS.graphQlRequest(query).then(response => {
      expect(response.status).toBe(200);
      expect(response.data).not.toBe(undefined);
    });
  });
});