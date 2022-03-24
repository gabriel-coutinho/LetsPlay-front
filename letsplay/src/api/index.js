import { toast } from 'react-toastify';
import api from './api';

/* ROUTES AUTH */
export async function login(email, password, setIsLoading) {
  try {
    setIsLoading(true);

    const url = '/auth/login';
    const body = {
      email,
      password,
    };

    const result = await api.post(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function verifyCodeRequest(email, code, setIsLoading) {
  try {
    setIsLoading(true);

    const url = '/auth/verifyCode';
    const body = {
      email,
      code,
    };

    const result = await api.post(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function verifyToken() {
  const url = '/auth/verifyToken';
  const result = await api.get(url);

  return result;
}

/* ROUTES USER */
export async function createUser(
  name,
  lastName,
  gender,
  phoneNumber,
  email,
  password,
  setIsLoading
) {
  try {
    setIsLoading(true);

    const url = '/user';
    const body = {
      user: {
        name,
        lastName,
        gender,
        phoneNumber,
        email,
        password,
      },
    };

    const result = await api.post(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function updateUser(id, name, lastName, gender, phoneNumber, email, setIsLoading) {
  try {
    setIsLoading(true);

    const url = `/user/${id}`;
    const body = {
      user: {
        name,
        lastName,
        gender,
        phoneNumber,
        email,
      },
    };

    const result = await api.put(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function forgetPassword(email, setIsLoading) {
  try {
    setIsLoading(true);

    const url = '/user/forgetPassword';
    const body = {
      email,
    };

    const result = await api.post(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function changePassword(newPassword, setIsLoading) {
  try {
    setIsLoading(true);

    const url = '/user/changePassword';
    const body = {
      newPassword,
    };

    const result = await api.put(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function getLoggedUser() {
  const url = `/user/loggedUser`;
  const result = await api.get(url);

  return result;
}

export async function getUserById(id) {
  try {
    const url = `/user/${id}`;
    const result = await api.get(url);

    return result;
  } catch (error) {
    let msg = '';

    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    toast.error(msg);
  }
}

/* ROUTES POST */
export async function createPost(
  title,
  describe,
  sportId,
  ownerId,
  date,
  price,
  vacancy,
  street,
  number,
  district,
  city,
  state,
  zipCode,
  complement,
  setIsLoading
) {
  try {
    setIsLoading(true);

    const url = '/post';
    const body = {
      post: {
        title,
        describe,
        sportId,
        ownerId,
        date,
        price,
        vacancy,
      },
      address: {
        street,
        number,
        district,
        city,
        state,
        zipCode,
        complement,
      },
    };

    const result = await api.post(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function updatePost(
  id,
  title,
  describe,
  sportId,
  date,
  price,
  vacancy,
  street,
  number,
  district,
  city,
  state,
  zipCode,
  complement,
  setIsLoading
) {
  try {
    setIsLoading(true);

    const url = `/post/${id}`;
    const body = {
      post: {
        title,
        describe,
        sportId,
        date,
        price,
        vacancy,
      },
      address: {
        street,
        number,
        district,
        city,
        state,
        zipCode,
        complement,
      },
    };

    const result = await api.put(url, body);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function getMyPosts(page, setIsLoading) {
  try {
    setIsLoading(true);

    const url = `/user/me/posts`;
    const result = await api.get(url, { params: { page, pageSize: 10 } });

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function getPostsByUserId(ownerId, page, setIsLoading) {
  try {
    setIsLoading(true);

    const url = `/user/${ownerId}/posts`;
    const result = await api.get(url, { params: { page, pageSize: 10 } });

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function getPostById(id, setIsLoading) {
  try {
    setIsLoading(true);

    const url = `/post/${id}`;
    const result = await api.get(url);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function getPostsByStatus(status, page, setIsLoading) {
  try {
    setIsLoading(true);

    const url = `/post`;
    const result = await api.get(url, { params: { status, page, pageSize: 10 } });

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    msg.concat(' Faça login novamente.');

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function deletePost(id) {
  try {
    const url = `/post/${id}`;
    const result = await api.delete(url);

    return result;
  } catch (error) {
    let msg = '';

    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    toast.error(msg);
  }
}

/* ROUTES COMMENT */
export async function getCommentsByPostId(postId, setIsLoading) {
  try {
    setIsLoading(true);

    const url = `/comment/post/${postId}`;
    const result = await api.get(url);

    setIsLoading(false);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    setIsLoading(false);
    toast.error(msg);
  }
}

export async function createComment(content, ownerId, postId) {
  try {
    const url = '/comment';
    const body = {
      comment: {
        content,
        ownerId,
        postId,
      },
    };
    const result = await api.post(url, body);

    return result;
  } catch (error) {
    let msg = '';
    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    toast.error(msg);
  }
}

export async function deleteComment(id) {
  try {
    const url = `/comment/${id}`;
    const result = await api.delete(url);

    return result;
  } catch (error) {
    let msg = '';

    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    toast.error(msg);
  }
}

/* ROUTES SPORT */

export async function getSports() {
  try {
    const url = `/sport`;
    const result = await api.get(url);

    return result;
  } catch (error) {
    let msg = '';

    if (error.response) msg = error.response.data.error;
    else msg = 'Network failed';

    toast.error(msg);
  }
}
