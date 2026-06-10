import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/addresses.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(userId: number, createAddressDto: CreateAddressDto){
    const address = this.addressRepository.create({
        ...createAddressDto,
        userId,
    });
    return await this.addressRepository.save(address);
  }
    async getMyAdresses(userId: number){
        return await this.addressRepository.find({ where: { userId } });
    }
    async deleteAddress(userId: number, id: string){
        const address = await this.addressRepository.findOne({ where: { id: parseInt(id), userId } });
        if(!address){
            throw new NotFoundException('Address not found');
        }   
        await this.addressRepository.remove(address);
        return { message: 'Address deleted successfully'};
  } 

}