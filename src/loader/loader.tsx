class Loader {
  baseUrl = 'http://127.0.0.1:3000';

  async getData(url: string) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async postData<T>(url: string, content: T) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async deleteData(url: string) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async putData<T>(url: string, content: T) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      return null;
    }
  }

  async patchData(url: string, id: number, status: string, raceId: number) {
    try {
      const response = await fetch(`${this.baseUrl}${url}?id=${id}&status=${status}`, {
        method: 'PATCH',
      });
      if (response.ok) {
        const res = await response.json();
        res.raceId = raceId;
        return res;
      }
      return { status: response.status, raceId: raceId };
    }
    catch (e) {
      return null;
    }
  }

  getAllCars() {
    return this.getData('/garage');
  }

  getCarById(id: number) {
    return this.getData(`/garage/${id}`);
  }

  createCar(name: string, color: string) {
    return this.postData('/garage', { name, color });
  }

  deleteCar(id: number) {
    return this.deleteData(`/garage/${id}`);
  }

  updateCar(id: number, name: string, color: string) {
    return this.putData(`/garage/${id}`, { name, color });
  }

  toggleEngine(id: number, status: string, raceId: number) {
    return this.patchData('/engine', id, status, raceId);
  }

  toggleDriveMode(id: number, raceId: number) {
    return this.patchData('/engine', id, 'drive', raceId);
  }

  getAllWinners() {
    return this.getData('/winners');
  }

  getWinnerById(id: number) {
    return this.getData(`/winners/${id}`);
  }

  createWinner(id: number, wins: number, time: number) {
    return this.postData('/winners', { id, wins, time });
  }

  deleteWinner(id: number) {
    return this.deleteData(`/winners/${id}`);
  }

  updateWinner(id: number, wins: number, time: number) {
    return this.putData(`/winners/${id}`, { wins, time });
  }
}

export default Loader;
