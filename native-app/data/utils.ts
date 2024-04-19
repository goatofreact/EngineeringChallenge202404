import { Platform } from "react-native";
import axios from 'axios';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { MachineType, apiMap, partInfo } from "./types";



let baseUrl: string =
    'https://fancy-dolphin-65b07b.netlify.app/api';

if (__DEV__) {
    baseUrl = `http://${Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
        }:3001`;
}


export async function login(username: string, password: string) {

    console.log(baseUrl + apiMap.login);
    try {
        const response = await axios.post(baseUrl + apiMap.login, {
            username, password
        });

        // if (response.data?.factory) {
        //     setScores(response.data);
        // }
        console.log('login', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(
            `There was an error loging in ${error.toString() === 'AxiosError: Network Error'
                ? 'Is the api server started?'
                : error
            }`,
        );
    }
}

export async function signUp(username: string, password: string) {

    console.log(baseUrl + apiMap.signUp);
    try {
        const response = await axios.post(baseUrl + apiMap.signUp, {
            username, password
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(
            `There was an error signing up ${error.toString() === 'AxiosError: Network Error'
                ? 'Is the api server started?'
                : error
            }`,
        );
    }
}

export async function logout(username: string, password: string) {

    console.log(baseUrl + apiMap.logout);
    try {
        const response = await axios.post(baseUrl + apiMap.logout, {
            username, password
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(
            `There was an error loging in ${error.toString() === 'AxiosError: Network Error'
                ? 'Is the api server started?'
                : error
            }`,
        );
    }
}

export async function machinePost(machineType: MachineType, machineInfo: any) {

    console.log(baseUrl + apiMap.machinePost);
    try {
        const response = await axios.post(baseUrl + apiMap.machinePost, {
            machineType, machineInfo
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(
            `There was an error posting machine ${error.toString() === 'AxiosError: Network Error'
                ? 'Is the api server started?'
                : error
            }`,
        );
    }
}

export async function partPost(machineType: MachineType, partInfo: any) {

    console.log(baseUrl + apiMap.partPost);
    try {
        const response = await axios.post(baseUrl + apiMap.partPost, {
            machineType, partInfo
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(
            `There was an error posting machine ${error.toString() === 'AxiosError: Network Error'
                ? 'Is the api server started?'
                : error
            }`,
        );
    }
}