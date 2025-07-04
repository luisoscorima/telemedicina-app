import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    create(data: CreateUserDto) {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    findAll() {
        return this.userRepo.find();
    }

    findOne(id: string) {
        return this.userRepo.findOneBy({ id });
    }

    async update(id: string, data: UpdateUserDto) {
        if (!data || Object.keys(data).every((key) => data[key] === undefined || data[key] === null)) {
            throw new Error('No se proporcionaron datos válidos para actualizar');
        }

        const user = await this.userRepo.preload({ id, ...data });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        return this.userRepo.save(user);
    }



    async remove(id: string) {
        await this.userRepo.delete(id);
        return { deleted: true };
    }

    findByEmail(email: string) {
        return this.userRepo.findOneBy({ email });
    }

    async createUser(dto: CreateUserDto) {
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        Object.assign(user, dto);
        return this.userRepo.save(user);
    }

    async deleteUser(id: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return this.userRepo.remove(user);
    }

}
