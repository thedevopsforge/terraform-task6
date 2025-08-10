provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "math_api_sg" {
  name        = "math-api-security-group"
  description = "Allow HTTP and SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "math_api_instance" {
  ami             = "ami-050fd9796aa387c0d" # Amazon Linux 2023
  instance_type   = "t2.small"
  key_name        = "terraform-key"
  security_groups = [aws_security_group.math_api_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install docker -y
              systemctl start docker
              systemctl enable docker
              docker run -d -p 80:80 thedevopsforge/math-api
              EOF

  tags = {
    Name = "math-api-instance"
  }
}

output "public_ip" {
  value = aws_instance.math_api_instance.public_ip
}
