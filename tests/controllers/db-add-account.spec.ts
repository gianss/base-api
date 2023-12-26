import { throwError } from '../mocks'
import { mockAccount, mockAddAccountParams } from '../mocks/mock-account'
import { HasherSpy } from '../mocks/mock-cryptography'
import { AddAccountRepositorySpy, CheckAccountByEmailRepositorySpy } from '../mocks/mock-db-account'
import { DbAddAccount } from '@/controllers/account/db-add-account'

type SutTypes = {
    sut: DbAddAccount
    addAccountRepositorySpy: AddAccountRepositorySpy
    checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const hasherSpy = new HasherSpy()
    const addAccountRepositorySpy = new AddAccountRepositorySpy()
    const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, checkAccountByEmailRepositorySpy)
    return {
        sut,
        addAccountRepositorySpy,
        checkAccountByEmailRepositorySpy
    }
}

describe('DbAddAccount Usecase', () => {
    test('Should call Hasher with correct plaintext', async () => {
        const { sut } = makeSut()
        const addAccountParams = mockAddAccountParams()
        const account = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(account.password).toBe(addAccountParams.password)
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut } = makeSut()
        const addAccountParams = mockAddAccountParams()
        const account = await sut.add(addAccountParams)
        expect(account).toEqual(mockAccount())
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositorySpy } = makeSut()
        jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddAccountParams())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if CheckAccountByEmailRepository returns true', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        checkAccountByEmailRepositorySpy.result = true
        const isValid = await sut.add(mockAddAccountParams())
        expect(isValid).toBe(null)
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, checkAccountByEmailRepositorySpy } = makeSut()
        const addAccountParams = mockAddAccountParams()
        await sut.add(addAccountParams)
        expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
    })
})
