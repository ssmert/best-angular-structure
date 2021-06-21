import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
    private config: object;
    constructor() {
        this.config = environment;
    }

    /**
     * 서버 엔드포인트를 반환한다.
     */
    getEndpoint() {
        return this.config['endpoint'];
    };

    /**
     * 설정정보를 반환한다.
     * 
     * @param key 식별자
     * @param defaultValue 기본값
     */
    get(key: any, defaultValue?: any): any {
        // 설정값 찾기 재귀호출 함수
        const findConfig = (name, conf) => {
            let value = conf[name.shift()];
            if (0 < name.length) {
                value = findConfig(name, value);
            }

            return value;
        };

        const names = key.split('.');
        const rntValue = findConfig(names, this.config);

        return (rntValue === undefined || rntValue === null || rntValue === '') ? defaultValue : rntValue;
    };
}
