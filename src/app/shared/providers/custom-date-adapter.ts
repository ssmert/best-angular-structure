import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {
    fromModel(value: string | null): NgbDateStruct | null {
        if (!value) {
            return null;
        }
        const split = value.split('-');
        return {
            year: parseInt(split[0], 10),
            month: parseInt(split[1], 10),
            day: parseInt(split[2], 10)
        };
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date != null ? `${date.year}-${pad(date.month)}-${pad(date.day)}` : null;
    }
}
