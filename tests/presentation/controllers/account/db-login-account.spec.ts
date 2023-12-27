import { DbLoginAccount } from '@/domain/usecases/db-login-account'
import { mockLoginParams } from '../../../mocks/mock-account'
import { EncrypterSpy, HashComparerSpy } from '../../../mocks/mock-cryptography'
import { LoadAccountByEmailRepositorySpy } from '../../../mocks/mock-db-account'
import { throwError } from '../../../mocks'

type SutTypes = {
    sut: DbLoginAccount
    loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
    hashComparerSpy: HashComparerSpy
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
    const hashComparerSpy = new HashComparerSpy()
    const encrypterSpy = new EncrypterSpy()
    const sut = new DbLoginAccount(hashComparerSpy, encrypterSpy, loadAccountByEmailRepositorySpy)
    return {
        sut,
        loadAccountByEmailRepositorySpy,
        hashComparerSpy
    }
}

describe('DbLoginAccount Usecase', () => {
    test('Should call LoadAccountByEmailRepositorySpy with correct values', async () => {
        const { sut } = makeSut()
        const addLoginParams = mockLoginParams()
        const response = await sut.login(addLoginParams)
        expect(response.token).toEqual(expect.any(String))
        expect(response.name).toEqual(expect.any(String))
    })

    test('LoadAccountByEmailRepositorySpy should return null if no email exists', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        const addLoginParams = mockLoginParams()
        const response = await sut.login(addLoginParams)
        expect(response).toEqual(null)
    })

    test('LoadAccountByEmailRepositorySpy should return null if password is invalid', async () => {
        const { sut, loadAccountByEmailRepositorySpy, hashComparerSpy } = makeSut()
        loadAccountByEmailRepositorySpy.result = null
        hashComparerSpy.isValid = true
        const addLoginParams = mockLoginParams()
        const response = await sut.login(addLoginParams)
        expect(response).toEqual(null)
    })

    test('Should throw if LoadAccountByEmailRepositorySpy throws', async () => {
        const { sut, loadAccountByEmailRepositorySpy } = makeSut()
        jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
        const promise = sut.login(mockLoginParams())
        await expect(promise).rejects.toThrow()
    })
})
