{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, flake-utils }:

  flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {};
    in rec {
      # For `nix develop`:
      devShell = pkgs.mkShell {
        nativeBuildInputs = [
          pkgs.nodejs_21
        ];
      };
    }
  );
}