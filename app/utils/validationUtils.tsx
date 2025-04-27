

export function validateEmail(email: string,confirmEmail:string): boolean {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && email === confirmEmail;
}

export function validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) { return false;}
    if (/^(\d)(\1{10})$/.test(cpf)) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cpf[9]) !== firstDigit) {return false};
    return true;

}

export function cpfFomat(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function toNumber(str:string){
    return Number(str.replace(/[^0-9]/g, ""));
}


export function gerarCpf() {
    const cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    const calcularDigito = (cpfArray:any, pesoInicial:any) => {
      const soma = cpfArray.reduce((acc:any, num:any, index:any) => acc + num * (pesoInicial - index), 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
    const primeiroDigito = calcularDigito(cpf, 10);
    cpf.push(primeiroDigito);

    const segundoDigito = calcularDigito(cpf, 11);
    cpf.push(segundoDigito);
    return cpf.join('');
  }
  
